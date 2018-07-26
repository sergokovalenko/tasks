using AutoMapper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models.AwardModels;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Models
{
    public class UserPictureBllModel
    {
        private IUserLogic userBll;
        private IPictureLogic pictureBll;
        private IAwardLogic awardBll;

        public UserPictureBllModel(IUserLogic userBll, IPictureLogic pictureBll, IAwardLogic awardBll)
        {
            this.userBll = userBll;
            this.pictureBll = pictureBll;
            this.awardBll = awardBll;
        }

        public IEnumerable<DisplayUserVM> GetModelForHomePage(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return GetAllUsersWithAwards();
            }

            if (query.Length == 1)
            {
                return Mapper.Map<IEnumerable<DisplayUserVM>>(userBll.GetUsersByFirstLetter(query[0]));
            }

            return Mapper.Map<IEnumerable<DisplayUserVM>>(userBll.GetUsersContains(query));
        }

        public UserDTO GetOldestUserByName(string name)
        {
            return userBll.GetOldestUserByName(name);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return userBll.GetAllUsers();
        }

        public int AddUser(UserDTO user)
        {
            return userBll.AddUser(user);
        }

        public bool DeleteUser(int id)
        {
            return userBll.DeleteUser(id);
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            return userBll.UpdateUser(updatedUser);
        }

        public UserDTO GetUserById(int id)
        {
            return userBll.GetUserById(id);
        }

        public IEnumerable<DisplayUserVM> GetAllUsersWithAwards()
        {
            var users = userBll.GetAllUsers().ToList();
            List<DisplayUserVM> usersVM = Mapper.Map<IEnumerable<DisplayUserVM>>(userBll.GetAllUsers()).ToList();

            for (int i = 0; i < usersVM.Count; i++)
            {
                usersVM[i].Awards = awardBll.GetAwardsForUser(usersVM[i].Id).ToList();
            }

            return usersVM;
        }

        public DownloadableFile GetFileWithUsers()
        {
            return userBll.GetFileWithUsers();
        }

        public bool AwardUserByUrl(string user_award)
        {
            if (string.IsNullOrWhiteSpace(user_award))
            {
                return false;
            }
            var res = user_award.Split('_');

            if (res == null || res.Length != 2)
            {
                return false;
            }

            int userId = 0;
            int awardId = 0;

            int.TryParse(res[0], out userId);
            int.TryParse(res[1], out awardId);

            if (userId <= 0 || awardId <= 0)
            {
                return false;
            }
            if (userBll.GetUserById(userId) == null || awardBll.GetAwardById(awardId) == null)
            {
                return false;
            }

            return AddAwardToUser(userId, awardId);
        }

        public ImageDTO GetImageById(Guid id)
        {
            return pictureBll.GetImageById(id);
        }

        public Guid Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        public bool CreateUser(CreateUserVM user, HttpRequestBase request)
        {
            Guid imageId = Guid.Empty;
            var newUser = Mapper.Map<UserDTO>(user);
            var uploaded = request.Files["Uploaded"];

            if (uploaded != null && uploaded.ContentLength != 0)
            {
                byte[] bytes = new byte[uploaded.ContentLength];
                uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                var img = new ImageDTO()
                {
                    OwnerId = Guid.NewGuid(),
                    Data = bytes,
                    Type = uploaded.ContentType
                };

                imageId = Addimage(img);
                newUser.ImageId = imageId;
            }

            int newUserId = AddUser(newUser);

            if (newUserId != 0)
            {
                return true;
            }

            return false;
        }

        public DisplayUserVM GetDetailedUser(string id)
        {
            int userId;
            DisplayUserVM userModel = null;
            bool isNumber = int.TryParse(id, out userId);

            if (isNumber)
            {
                userModel = Mapper.Map<DisplayUserVM>(userBll.GetUserById(userId));
            }
            else
            {
                id = id.Remove('_', ' ');
                userModel = Mapper.Map<DisplayUserVM>(userBll.GetOldestUserByName(id));
            }

            if (userModel != null)
            {
                userModel.Awards = awardBll.GetAwardsForUser(userModel.Id).ToList();
            }

            return userModel;
        }

        public DeleteUserVM GetUser(int id)
        {
            var user = userBll.GetUserById(id);

            if (user == null)
            {
                return null;
            }

            var userModel = Mapper.Map<DeleteUserVM>(user);

            return userModel;
        }

        internal bool UpdateUser(EditUserVM user, HttpRequestBase request)
        {
            var updatedUser = Mapper.Map<UserDTO>(user);
            var uploaded = request.Files["Uploaded"];

            if (uploaded != null && uploaded.ContentLength != 0)
            {
                bool hadImage = true;
                byte[] bytes = new byte[uploaded.ContentLength];
                uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                if (updatedUser.ImageId == Guid.Empty)
                {
                    updatedUser.ImageId = Guid.NewGuid();
                    hadImage = false;
                }

                var img = new ImageDTO()
                {
                    OwnerId = updatedUser.ImageId,
                    Data = bytes,
                    Type = uploaded.ContentType
                };

                if (hadImage)
                {
                    pictureBll.UpdateImage(img);
                }
                else
                {
                    updatedUser.ImageId = pictureBll.AddImage(img);
                }
            }

            return UpdateUser(updatedUser);
        }

        internal bool DeleteUserImage(Guid ownerId)
        {
            return pictureBll.DeleteImage(ownerId);
        }

        public RewardVM GetFreeAwardsForUser(int userId)
        {
            var awards = Mapper.Map<List<DisplayAwardVM>>(awardBll.GetFreeAwardsForUser(userId).ToList());

            return new RewardVM()
            {
                UserId = userId,
                Awards = awards
            };
        }

        public bool AddAwardToUser(int userId, int awardId)
        {
            if (!userBll.UserHasAward(userId, awardId))
            {
                return userBll.AddAwardToUser(userId, awardId);
            }

            return false;
        }

        public int CalculateAge(DateTime date)
        {
            return userBll.CalculateAge(date);
        }
    }
}