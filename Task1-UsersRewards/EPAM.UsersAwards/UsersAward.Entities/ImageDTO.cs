using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UsersAward.Entities
{
    public class ImageDTO
    {
        public byte[] Data { get; set; }
        public string Type { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
    }
}
