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
    public class PictureLogic : IPictureLogic
    {
        private IPictureDal dal;

        public PictureLogic(IPictureDal dal)
        {
            this.dal = dal;
        }

        public Guid AddImage(ImageDTO img)
        {
            if (img == null)
            {
                throw new ArgumentNullException(nameof(img));
            }
            if (img.OwnerId == Guid.Empty)
            {
                throw new ArgumentException(nameof(img.OwnerId));
            }
            if (string.IsNullOrWhiteSpace(img.Type))
            {
                throw new ArithmeticException(nameof(img.Type));
            }

            img.OwnerId = Guid.NewGuid();

            if (dal.AddImage(img))
            {
                return img.OwnerId;
            }

            return Guid.Empty;
        }

        public bool DeleteImage(Guid OwnerId)
        {
            if (OwnerId == Guid.Empty)
            {
                throw new ArgumentException(nameof(OwnerId));
            }

            return dal.DeleteImage(OwnerId);
        }

        public ImageDTO GetImageById(Guid id)
        {
            ImageDTO img = dal.GetImageById(id);

            if (img == null)
                return dal.GetImageById(Guid.Empty);

            return img;
        }

        public bool UpdateImage(ImageDTO img)
        {
            if (img == null)
            {
                throw new ArgumentNullException(nameof(img));
            }
            if (img.OwnerId == Guid.Empty)
            {
                throw new ArgumentException(nameof(img.OwnerId));
            }
            if (string.IsNullOrWhiteSpace(img.Type))
            {
                throw new ArgumentException(nameof(img.Type));
            }

            return dal.UpdateImage(img);
        }
    }
}
