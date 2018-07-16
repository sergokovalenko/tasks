using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.BLL.BasicBLL;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public static class BllModel
    {
        private static IAbstractBLL bll = new BasicBLL();

        public static IEnumerable<UserDTO> GetAllUsers()
        {
            return bll.GetAllUsers();
        }

        public static bool AddUser(UserDTO user)
        {
            return bll.AddUser(user);
        }

        public static bool DeleteUser(Guid id)
        {
            return bll.DeleteUser(id);
        }

        public static bool UpdateUser(UserDTO updatedUser)
        {
            return bll.UpdateUser(updatedUser);
        }

        public static UserDTO GetUserById(Guid id)
        {
            return bll.GetUserById(id);
        }

        public static IEnumerable<AwardDTO> GetAllAwards()
        {
            return bll.GetAllAwards();
        }

        public static bool AddAward(AwardDTO user)
        {
            return bll.AddAward(user);
        }

        public static bool DeleteAward(Guid id)
        {
            return bll.DeleteAward(id);
        }

        public static bool UpdateAward(AwardDTO updatedAward)
        {
            return bll.UpdateAward(updatedAward);
        }

        public static AwardDTO GetAwardById(Guid id)
        {
            return bll.GetAwardById(id);
        }

        public static (byte[] bytes, string type) GetFileWithUsers()
        {
            return bll.GetFileWithUsers();
        }
    }
}