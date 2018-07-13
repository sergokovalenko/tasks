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

        public static IEnumerable<UserVM> GetAllUsers()
        {
            List<UserVM> usersVM = new List<UserVM>();
            var usersDTO = bll.GetAllUsers();

            foreach (var item in usersDTO)
            {
                usersVM.Add(item);
            }

            return usersVM;
        }

        public static IEnumerable<AwardVM> GetAllAwards()
        {
            List<AwardVM> awardsVM = new List<AwardVM>();
            var awardsDTO = bll.GetAllAwards();

            foreach (var item in awardsDTO)
            {
                awardsVM.Add(item);
            }

            return awardsVM;
        }

    }
}