using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class UserLogic : IUserLogic
    {
        private IUserDal userDal;
        private IAwardDal awardDal;

        public UserLogic(IUserDal dal, IAwardDal awardDal)
        {
            this.userDal = dal;
            this.awardDal = awardDal;
        }

        public int AddUser(UserDTO user)
        {
            if (!IsUserValide(user))
            {
                return ModelRules.LowerBoundOfId - 1;
            }

            return userDal.AddUser(user);
        }

        public bool DeleteUser(int userId)
        {
            if (userId < ModelRules.LowerBoundOfId)
            {
                return false;
            }
            return userDal.DeleteUser(userId);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return userDal.GetAllUsers().Select(x =>
            {
                x.Age = CalculateAge(x.BirthDate);
                return x;
            }).ToList();
        }

        public UserDTO GetUserById(int id)
        {
            if (id < ModelRules.LowerBoundOfId)
            {
                return null;
            }
            UserDTO user = userDal.GetUserById(id);
            if (user == null)
            {
                return null;
            }

            user.Age = CalculateAge(user.BirthDate);
            return user;
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            if (!IsUserValide(updatedUser))
            {
                return false;
            }

            return userDal.UpdateUser(updatedUser);
        }

        public bool AddAwardToUser(int userId, int awardId)
        {
            if (userId < ModelRules.LowerBoundOfId || awardId < ModelRules.LowerBoundOfId)
            {
                return false;
            }

            return userDal.AddAwardToUser(userId, awardId);
        }

        public int CalculateAge(DateTime birthDate)
        {
            DateTime dateNow = DateTime.Now;
            int age = dateNow.Year - birthDate.Year;

            if (dateNow.Month < birthDate.Month || dateNow.Month == birthDate.Month && dateNow.Day < birthDate.Day)
            {
                age--;
            }

            return age;
        }

        public IEnumerable<UserDTO> GetUsersByFirstLetter(char letter)
        {
            if (char.IsSeparator(letter))
            {
                return null;
            }

            return userDal.GetUsersByFirstLetter(letter).Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate), ImageId = user.ImageId });
        }

        public IEnumerable<UserDTO> GetUsersContains(string text)
        {
            if (string.IsNullOrWhiteSpace(text) || text.Length > ModelRules.MaxNameLength)
            {
                return null;
            }
            text = text.Trim();

            return userDal.GetUsersContains(text).Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate), ImageId = user.ImageId });
        }

        public UserDTO GetOldestUserByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Length > ModelRules.MaxNameLength)
            {
                return null;
            }
            name = name.Trim();

            return userDal.GetOldestUserByName(name);
        }

        public DownloadableFile GetFileWithUsers()
        {
            DownloadableFile dFile = new DownloadableFile()
            {
                Type = "text/plain",
                FileName = "All users"
            };

            var text = GenerateTextForFile();

            dFile.Data = Encoding.ASCII.GetBytes(text);

            return dFile;
        }

        public bool UserHasAward(int userId, int awardId)
        {
            if (userId < 0 || awardId < 0)
            {
                return false;
            }

            return userDal.UserHasAward(userId, awardId);
        }

        private string GenerateTextForFile()
        {
            StringBuilder sb = new StringBuilder();
            var users = GetAllUsers();

            foreach (var item in users)
            {
                sb.AppendFormat("{0}, {1:d}, {2} ", item.Name, item.BirthDate, item.Age);
                var userAwards = awardDal.GetAwardsForUser(item.Id).ToList();
                if (userAwards == null || userAwards.Count == 0)
                {
                    sb.Append("hasn't awards");
                }
                else
                {
                    sb.Append("has awards: ");
                    foreach (var aw in userAwards)
                    {
                        sb.AppendFormat(" {0}", aw.Title);
                    }
                }
                sb.Append(Environment.NewLine);
            }

            return sb.ToString();
        }

        private bool IsUserValide(UserDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name))
            {
                return false;
            }

            var age = CalculateAge(user.BirthDate);

            if (age > ModelRules.MaxAge || age < ModelRules.MinAge)
            {
                return false;
            }

            return true;
        }
    }
}