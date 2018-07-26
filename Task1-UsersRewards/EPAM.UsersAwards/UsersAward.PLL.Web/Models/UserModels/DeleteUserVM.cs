using System;
using System.ComponentModel.DataAnnotations;

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