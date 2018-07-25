using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class UserLogic : IUserLogic
    {
        private IUserDal dal;

        public UserLogic(IUserDal dal)
        {
            this.dal = dal;
        }

        //TODO: int?
        public int AddUser(UserDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name))
            {
                return -1;
            }

            var age = CalculateAge(user.BirthDate);

            if (age > 150 || age < 0)
            {
                return -1;
            }

            return dal.AddUser(user);
        }

        public bool DeleteUser(int userId)
        {
            return dal.DeleteUser(userId);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return dal.GetAllUsers().Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate), ImageId = user.ImageId });
        }

        public UserDTO GetUserById(int id)
        {
            UserDTO user = dal.GetUserById(id);
            if (user == null)
            {
                return null;
            }

            user.Age = CalculateAge(user.BirthDate);
            return user;
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            if (updatedUser == null || string.IsNullOrWhiteSpace(updatedUser.Name))
            {
                return false;
            }

            var age = CalculateAge(updatedUser.BirthDate);

            if (age > 150 || age < 0)
            {
                return false;
            }

            return dal.UpdateUser(updatedUser);
        }

        public bool AddAwardToUser(int userId, int awardId)
        {
            if (userId < 0 || awardId < 0)
            {
                return false;
            }

            return dal.AddAwardToUser(userId, awardId);
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

            return dal.GetUsersByFirstLetter(letter).Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate), ImageId = user.ImageId });
        }

        public IEnumerable<UserDTO> GetUsersContains(string text)
        {
            if (string.IsNullOrWhiteSpace(text) || text.Length > 50)
            {
                return null;
            }
            text = text.Trim();

            return dal.GetUsersContains(text).Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate), ImageId = user.ImageId });
        }

        public UserDTO GetOldestUserByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Length > 50)
            {
                return null;
            }
            name = name.Trim();

            return dal.GetOldestUserByName(name);
        }
    }
}
