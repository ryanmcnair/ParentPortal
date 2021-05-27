using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.DataAccess;
using ParentPortal.Models;

namespace ParentPortal.Controllers
{
    [Route("api/likes")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        LikeRepository _repo;

        public LikesController()
        {
            _repo = new LikeRepository();
        }

        [HttpGet]
        public IActionResult GetAllLikes()
        {
            return Ok(_repo.GetAll());
        }
    }
}
