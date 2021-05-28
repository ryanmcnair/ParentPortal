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
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        MessageRepository _repo;

        public MessagesController()
        {
            _repo = new MessageRepository();
        }

        [HttpGet]
        public IActionResult GetAllMessages()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{senderFb_uid}/sent")]
        public IActionResult GetMessagesBySender(string senderFb_uid)
        {
            var message = _repo.GetMessagesBySender(senderFb_uid);
            if (message == null)
            {
                return NotFound("Not found");
            }
            return Ok(message);
        }

        [HttpGet("{recipientFb_uid}/inbox")]
        public IActionResult GetMessagesByRecipient(string recipientFb_uid)
        {
            var message = _repo.GetMessagesByRecipient(recipientFb_uid);
            if (message == null)
            {
                return NotFound("Not found");
            }
            return Ok(message);
        }

        [HttpPost]
        public IActionResult AddAUser(Message message)
        {
            _repo.Add(message);
            return Created($"api/messages/{message.id}", message);
        }

        [HttpDelete("{messageId}")]
        public IActionResult DeleteMessage(int messageId)
        {
            _repo.Remove(messageId);
            return Ok();
        }
    }
}
