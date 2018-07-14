using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class EditUserVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
    }
}