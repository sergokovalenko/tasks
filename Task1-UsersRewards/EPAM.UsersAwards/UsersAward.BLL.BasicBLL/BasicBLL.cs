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
            return dal.GetAllAwards();
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return dal.GetAllUsers();
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            return dal.UpdateAward(updatedAward);
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            return dal.UpdateUser(updatedUser);
        }
    }
}
