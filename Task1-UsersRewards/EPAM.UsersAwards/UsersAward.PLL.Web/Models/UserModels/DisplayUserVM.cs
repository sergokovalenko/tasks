using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class DisplayUserVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public DateTime BirthDate { get; set; }
        //public List<AwardDTO> Awards { get; set; }

        public static explicit operator UserDTO(DisplayUserVM vm)
        {
            return new UserDTO()
            {
                Id = vm.Id,
                Name = vm.Name,
                Age = vm.Age,
                Awards = new List<AwardDTO>(),
                ImageId = Guid.Empty,
                BirthDate = vm.BirthDate
            };
        }

        public static implicit operator DisplayUserVM(UserDTO vm)
        {
            return new DisplayUserVM()
            {
                Id = vm.Id,
                Name = vm.Name,
                Age = vm.Age,
                BirthDate = vm.BirthDate
            };
        }
    }
}