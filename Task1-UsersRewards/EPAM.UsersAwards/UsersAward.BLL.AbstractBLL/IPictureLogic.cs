using System;
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
