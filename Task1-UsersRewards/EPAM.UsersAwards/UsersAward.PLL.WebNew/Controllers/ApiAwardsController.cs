using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class ApiAwardsController : ApiController
    {
        private AwardPictureBllModel bllModel;

        public ApiAwardsController(AwardPictureBllModel model)
        {
            this.bllModel = model;
        }

        [Route("api/awards/")]
        [Route("api/awards/{query}")]
        public IHttpActionResult Get(string query)
        {
            var model = bllModel.GetModelForHomePage(query);

            if (model == null)
            {
                return Json(model);
            }

            return Json(model.ToArray());
        }

        [Route("api/award/{id}")]
        public IHttpActionResult GetAward(string id)
        {
            var awardModel = bllModel.GetAward(id);

            if (awardModel == null)
            {
                return NotFound();
            }

            return Json(awardModel);
        }

        [Route("award/{id}/delete")]
        public IHttpActionResult Delete(int id)
        {
            if (bllModel.DeleteAward(id))
            {
                return Ok();
            }

            return NotFound();
        }

        [Route("api/award/{id}/edit")]
        [HttpPut]
        public IHttpActionResult EditAward(int id, [FromBody]EditAwardVM updatedAward)
        {
            var award = bllModel.GetAwardById(id);
            if (award == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                //TODO: валидация названия награды
                award.Title = updatedAward.Title;
            }
            if (!string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                updatedAward.Description = updatedAward.Description;
            }
            
            if (bllModel.UpdateAward(award))
            {
                return Ok();
            }

            return BadRequest("We can't edit award with this parametrs");
        }

        [Route("api/award/{id}/create")]
        [HttpPost]
        public IHttpActionResult CreateUser([FromBody]CreateAwardVM user)
        {
            if (string.IsNullOrWhiteSpace(user.Title))
            {
                return BadRequest("User should contains Title");
            }

            if (bllModel.AddAward(Mapper.Map<AwardDTO>(user)) > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest("We can't create award with this parametrs");
            }
        }
    }
}
