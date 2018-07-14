using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.BLL.BasicBLL;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public static class BLLManager
    {
        private static IAbstractBLL bll = new BasicBLL();

        public static IEnumerable<UserDTO> GetAllUsers()
        {
            return bll.GetAllUsers();
        }

        public static IEnumerable<AwardDTO> GetAllAwards()
        {
            return bll.GetAllAwards();
        }

    }
}