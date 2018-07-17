using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UsersAward.Entities
{
    public class UserDTO
    {
        //public UserDTO()
        //{
        //    Awards = new List<AwardDTO>();
        //}

        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public List<AwardDTO> Awards { get; set; }
    }
}
