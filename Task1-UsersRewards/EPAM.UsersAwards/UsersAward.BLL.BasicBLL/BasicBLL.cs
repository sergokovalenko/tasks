using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.DAL.DBDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class BasicBLL : IAbstractBLL
    {
        private IAbstractDAL dal;

        public BasicBLL()
        {
            dal = new DBDAL();
        }

        public bool AddAward(AwardDTO award)
        {
            if (award == null || string.IsNullOrWhiteSpace(award.Title) || award.Title.Length > 50)
            {
                return false;
            }
            if (string.IsNullOrWhiteSpace(award.Description))
            {
                award.Description = "";
            }
            award.Id = Guid.NewGuid();

            return dal.AddAward(award);
        }

        public bool AddUser(UserDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name))
            {
                return false;
            }

            var age = CalculateAge(user.BirthDate);

            if (age > 150 || age < 0)
            {
                return false;
            }

            if (user.Awards == null)
            {
                user.Awards = new List<AwardDTO>();
            }

            user.Id = Guid.NewGuid();
            return user == null ? false : dal.AddUser(user);
        }

        public bool DeleteAward(Guid awardId)
        {
            return awardId == Guid.Empty ? false : dal.DeleteAward(awardId);
        }

        public bool DeleteUser(Guid userId)
        {
            return userId == Guid.Empty ? false : dal.DeleteUser(userId);
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return dal.GetAllAwards().ToArray();
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return dal.GetAllUsers().Select(user => new UserDTO() { Id = user.Id, Awards = user.Awards, BirthDate = user.BirthDate, ImageId = user.ImageId, Name = user.Name, Age = CalculateAge(user.BirthDate)});
        }

        public AwardDTO GetAwardById(Guid id)
        {
            return dal.GetAwardById(id);
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

        public bool UpdateAward(AwardDTO updatedAward)
        {
            if (updatedAward == null || string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(updatedAward.Description))
            {
                updatedAward.Description = "";
            }

            return dal.UpdateAward(updatedAward);
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

            if (updatedUser.Awards == null)
            {
                updatedUser.Awards = new List<AwardDTO>();
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
