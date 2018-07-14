using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class EditAwardVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}