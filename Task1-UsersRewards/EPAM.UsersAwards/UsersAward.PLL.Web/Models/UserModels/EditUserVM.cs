using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class EditUserVM
    {
        public Guid Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
    }
}