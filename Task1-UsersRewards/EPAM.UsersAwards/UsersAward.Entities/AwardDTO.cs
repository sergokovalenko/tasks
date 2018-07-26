using System;

namespace UsersAward.Entities
{
    public class AwardDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid ImageId { get; set; }
    }
}
