using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class CreateUserVM : IValidatableObject
    {
        [StringLength(50)]
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            DateTime dateNow = DateTime.Now;
            int age = dateNow.Year - BirthDate.Year;

            if (dateNow.Month < BirthDate.Month || dateNow.Month == BirthDate.Month && dateNow.Day < BirthDate.Day)
            {
                age--;
            }

            if (age < 0 || age > 150)
            {
                yield return new ValidationResult("Age must in range from 0 to 150 years", new[] { nameof(BirthDate) });
            }
        }
    }
}