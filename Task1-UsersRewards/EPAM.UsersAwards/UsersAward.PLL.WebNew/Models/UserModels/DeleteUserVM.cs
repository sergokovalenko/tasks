using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class DeleteUserVM
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        [Display(Name = "Birthday")]
        [DisplayFormat(DataFormatString = "{0:d}")]
        public DateTime BirthDate { get; set; }

        public Guid ImageId { get; set; }
    }
}