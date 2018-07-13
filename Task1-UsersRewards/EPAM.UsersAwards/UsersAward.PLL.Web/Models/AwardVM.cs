using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public class AwardVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public static explicit operator AwardDTO(AwardVM vm)
        {
            return new AwardDTO()
            {
                Id = vm.Id,
                Description = vm.Description,
                Title = vm.Title
            };
        }

        public static implicit operator AwardVM(AwardDTO vm)
        {
            return new AwardVM()
            {
                Id = vm.Id,
                Description = vm.Description,
                Title = vm.Title
            };
        }
    }
}