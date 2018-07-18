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

        public Guid AddUser(UserDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name))
            {
                return Guid.Empty;
            }

            var age = CalculateAge(user.BirthDate);

            if (age > 150 || age < 0)
            {
                return Guid.Empty;
            }

            user.Id = Guid.NewGuid();

            if (dal.AddUser(user))
            {
                return user.Id;
            }

            return Guid.Empty;
        }

        public bool DeleteUser(Guid userId)
        {
            return userId == Guid.Empty ? false : dal.DeleteUser(userId);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return dal.GetAllUsers().Select(user => new UserDTO() { Id = user.Id, BirthDate = user.BirthDate, Name = user.Name, Age = CalculateAge(user.BirthDate) });
        }

        public UserDTO GetUserById(Guid id)
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

        public (byte[] bytes, string type) GetFileWithUsers()
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"AllUsers.txt");
            string fileType = "text/plain";
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
            }

            using (var writer = new StreamWriter(filePath, false))
            {
                var users = GetAllUsers();
                string text = "";

                //foreach (var item in users)
                //{
                //    text = string.Format("{0}, {1:d}, {2} ", item.Name, item.BirthDate, item.Age);
                //    if (item.Awards == null || item.Awards.Count == 0)
                //    {
                //        text += "hasn't awards";
                //    }
                //    else
                //    {
                //        text += "has awards: ";
                //        foreach (var aw in item.Awards)
                //        {
                //            text += " " + aw.Title;
                //        }
                //    }
                //    writer.WriteLine(text);
                //}
            }

            byte[] bytes = File.ReadAllBytes(filePath);

            return (bytes, fileType);
        }

        private int CalculateAge(DateTime birthDate)
        {
            DateTime dateNow = DateTime.Now;
            int age = dateNow.Year - birthDate.Year;

            if (dateNow.Month < birthDate.Month || dateNow.Month == birthDate.Month && dateNow.Day < birthDate.Day)
            {
                age--;
            }

            return age;
        }
    }
}
