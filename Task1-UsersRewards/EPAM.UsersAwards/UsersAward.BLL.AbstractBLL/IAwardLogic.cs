using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.BLL.AbstractBLL
{
    public interface IAwardLogic
    {
        IEnumerable<AwardDTO> GetAllAwards();
        AwardDTO GetAwardById(Guid id);
        bool DeleteAward(Guid awardId);
        bool AddAward(AwardDTO award);
        bool UpdateAward(AwardDTO updatedAward);
    }
}
