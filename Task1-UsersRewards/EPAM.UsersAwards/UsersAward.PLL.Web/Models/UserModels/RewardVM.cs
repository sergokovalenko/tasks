using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class RewardVM
    {
        public int UserId { get; set; }
        public List<DisplayAwardVM> Awards { get; set; }
    }
}