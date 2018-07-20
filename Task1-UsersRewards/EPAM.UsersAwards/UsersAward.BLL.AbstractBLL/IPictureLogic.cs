using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.BLL.AbstractBLL
{
    public interface IPictureLogic
    {
        ImageDTO GetImageById(Guid id);
        Guid AddImage(ImageDTO img);
        bool UpdateImage(ImageDTO img);
        bool DeleteImage(Guid OwnerId);
    }
}
