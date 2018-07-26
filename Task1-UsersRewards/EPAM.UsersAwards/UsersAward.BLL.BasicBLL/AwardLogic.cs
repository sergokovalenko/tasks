using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class AwardLogic : IAwardLogic
    {
        private IAwardDal dal;
        private const int lowerBoundOfId = 0;
        private const int maxNameLength = 50;
        private const int maxDescrLength = 250;

        public AwardLogic(IAwardDal dal)
        {
            this.dal = dal;
        }

        public int AddAward(AwardDTO award)
        {
            if (award == null || string.IsNullOrWhiteSpace(award.Title) || award.Title.Length > maxNameLength)
            {
                throw new ArgumentException(nameof(award));
            }
            if (string.IsNullOrWhiteSpace(award.Description))
            {
                award.Description = "";
            }
            award.Id = -1;

            return dal.AddAward(award);
        }

        public bool DeleteAward(int awardId)
        {
            return dal.DeleteAward(awardId);
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return dal.GetAllAwards().ToArray();
        }

        public AwardDTO GetAwardById(int id)
        {
            return dal.GetAwardById(id);
        }

        public IEnumerable<AwardDTO> GetAwardsForUser(int userId)
        {
            return dal.GetAwardsForUser(userId).ToArray();
        }

        public IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId)
        {
            if (userId <= lowerBoundOfId)
            {
                return null;
            }

            return dal.GetFreeAwardsForUser(userId).ToArray();
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            if (updatedAward == null || string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(updatedAward.Description))
            {
                updatedAward.Description = "";
            }
            if (updatedAward.Description.Length > maxDescrLength)
            {
                return false;
            }

            return dal.UpdateAward(updatedAward);
        }

        public IEnumerable<AwardDTO> GetAwardsByFirstLetter(char letter)
        {
            if (char.IsSeparator(letter))
            {
                return null;
            }

            return dal.GetAwardsByFirstLetter(letter).ToList();
        }

        public IEnumerable<AwardDTO> GetAwardsContains(string text)
        {
            if (string.IsNullOrWhiteSpace(text) || text.Length > maxNameLength)
            {
                return null;
            }
            text = text.Trim();

            return dal.GetAwardsContains(text).ToList();
        }

        public AwardDTO GetAwardByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Length > maxNameLength)
            {
                return null;
            }
            name = name.Trim();

            return dal.GetAwardByName(name);
        }
    }
}
