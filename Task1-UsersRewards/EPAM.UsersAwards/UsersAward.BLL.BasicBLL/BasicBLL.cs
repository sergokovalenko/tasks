using System;
using System.Collections.Generic;
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
        private static IAbstractDAL dal;

        public BasicBLL()
        {
            dal = new DBDAL();
        }

        public bool AddAward(AwardDTO award)
        {
            return award == null ? false : dal.AddAward(award);
        }

        public bool AddUser(UserDTO user)
        {
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

            if (CalculateAge(updatedUser.BirthDate) > 150)
            {
                return false;
            }

            if (updatedUser.Awards == null)
            {
                updatedUser.Awards = new List<AwardDTO>();
            }

            return dal.UpdateUser(updatedUser);
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
