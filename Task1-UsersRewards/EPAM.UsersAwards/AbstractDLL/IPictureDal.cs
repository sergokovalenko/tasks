using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.DAL.AbstractDAL
{
    public interface IPictureDal
    {
        ImageDTO GetImageById(Guid id);
        bool UpdateImage(ImageDTO img);
        bool AddImage(ImageDTO img);
        bool DeleteImage(Guid OwnerId);
    }
}
