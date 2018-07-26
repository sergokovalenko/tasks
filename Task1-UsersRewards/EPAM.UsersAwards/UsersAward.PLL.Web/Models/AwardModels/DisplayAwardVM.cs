using System;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class DisplayAwardVM
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Guid ImageId { get; set; }
    }
}