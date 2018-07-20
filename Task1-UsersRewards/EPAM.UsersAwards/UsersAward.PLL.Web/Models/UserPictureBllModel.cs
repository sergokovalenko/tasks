using AutoMapper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            var awards = awardBll.GetAllAwards().ToArray();
            var users = userBll.GetAllUsers().ToList();
            List<DisplayUserVM> usersVM = Mapper.Map<IEnumerable<DisplayUserVM>>(userBll.GetAllUsers()).ToList();

            for (int i = 0; i < usersVM.Count; i++)
            {
                usersVM[i].Awards = awardBll.GetAwardsForUser(usersVM[i].Id).ToList();
            }

            return usersVM;
        }

        public (byte[] bytes, string type) GetFileWithUsers()
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, Guid.NewGuid() + ".txt");
            string fileType = "text/plain";

            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
            }

            using (var writer = new StreamWriter(filePath, false))
            {
                var users = GetAllUsersWithAwards();
                string text = "";

                foreach (var item in users)
                {
                    text = string.Format("{0}, {1:d}, {2} ", item.Name, item.BirthDate, item.Age);
                    if (item.Awards == null || item.Awards.Count == 0)
                    {
                        text += "hasn't awards";
                    }
                    else
                    {
                        text += "has awards: ";
                        foreach (var aw in item.Awards)
                        {
                            text += " " + aw.Title;
                        }
                    }
                    writer.WriteLine(text);
                }
            }

            byte[] bytes = File.ReadAllBytes(filePath);

            File.Delete(filePath);

            return (bytes, fileType);
        }

        public ImageDTO GetImageById(Guid id)
        {
            return pictureBll.GetImageById(id);
        }

        public Guid Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        internal bool CreateUser(CreateUserVM user, HttpRequestBase request)
        {
            Guid imageId = Guid.Empty;
            var newUser = Mapper.Map<UserDTO>(user);
            var uploaded = request.Files["Uploaded"];

            if (uploaded != null)
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

        public DisplayUserVM GetDetailedUser(int id)
        {
            var user = userBll.GetUserById(id);

            if (user == null)
            {
                return null;
            }

            var userModel = Mapper.Map<DisplayUserVM>(user);
            userModel.Awards = awardBll.GetAwardsForUser(userModel.Id).ToList();

            return userModel;
        }

        internal bool UpdateUser(EditUserVM user, HttpRequestBase request)
        {
            var updatedUser = Mapper.Map<UserDTO>(user);

            //if (UpdateUser(updatedUser))
            //{
            //    var uploaded = request.Files["Uploaded"];

            //    if (uploaded == null)
            //    {
            //        return false;
            //    }

            //    byte[] bytes = new byte[uploaded.ContentLength];
            //    uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

            //    var img = new ImageDTO()
            //    {
            //        OwnerId = updatedUser.Id,
            //        Data = bytes,
            //        Type = uploaded.ContentType
            //    };

            //    if (pictureBll.GetImageById(img.OwnerId).OwnerId == Guid.Empty)
            //    {
            //        pictureBll.AddImage(img);
            //    }
            //    else
            //    {
            //        pictureBll.UpdateImage(img);
            //    }

            //    return true;
            //}

            return false;
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
            return userBll.AddAwardToUser( userId,  awardId);
        }
    }
}