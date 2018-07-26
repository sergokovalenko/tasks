using System;
using System.ComponentModel.DataAnnotations;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class EditUserVM
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate { get; set; }

        public Guid ImageId { get; set; }
    }
}