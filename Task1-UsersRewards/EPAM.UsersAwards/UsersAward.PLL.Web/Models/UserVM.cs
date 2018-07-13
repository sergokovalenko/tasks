using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public class UserVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public Guid ImageId { get; set; }
        public List<AwardDTO> Awards { get; set; }

        public static explicit operator UserDTO(UserVM vm)
        {
            return new UserDTO()
            {
                Id = vm.Id,
                Name = vm.Name,
                Age = vm.Age,
                Awards = vm.Awards,
                ImageId = vm.ImageId,
                BirthDate = vm.BirthDate
            };
        }

        public static implicit operator UserVM(UserDTO vm)
        {
            return new UserVM()
            {
                Id = vm.Id,
                Name = vm.Name,
                Age = vm.Age,
                Awards = vm.Awards,
                ImageId = vm.ImageId,
                BirthDate = vm.BirthDate
            };
        }
    }
}