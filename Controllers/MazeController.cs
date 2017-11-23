using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace save_the_pony.Controllers {
    
    [Route("api/[controller]")]
    public class MazeController : Controller {

        [HttpGet("[action]/{mazeId}")]
        public IActionResult Status(string mazeId) {
            using (var client = new HttpClient()) {
                try {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var response = client.GetAsync($"{mazeId}").Result;                    

                    var stringResult = response.Content.ReadAsStringAsync().Result.Replace("-","_");

                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting data from ponychallenge: {httpRequestException.Message}");
                }
            }
        }

        [HttpPost("[action]")]
        public IActionResult Start([FromBody] StartData maze) {
            using (var client = new HttpClient()) {
                try {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze");
                    var newMaze = JsonConvert.SerializeObject(maze).Replace("_","-");
                    var httpContent = new StringContent(newMaze, System.Text.Encoding.UTF8, "application/json");
                    var response = client.PostAsync($"", httpContent).Result;

                    var stringResult = response.Content.ReadAsStringAsync().Result;
                    
                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting movement from ponychallenge: {httpRequestException}");
                }
            }
        }
        
        [HttpPost("[action]/{maze_id}/{direction}")]
        public IActionResult Movement(string mazeId, string direction) {
            var jsonPost = new MovementsData { direction = direction };

            using (var client = new HttpClient()) {
                try {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var movement = JsonConvert.SerializeObject(jsonPost);
                    
                    var response = client.PostAsync(
                        $"{mazeId}",
                        new StringContent(
                            movement,
                            System.Text.Encoding.UTF8,
                            "application/json")
                        ).Result;

                    var stringResult = response.Content.ReadAsStringAsync().Result.Replace("-","_");

                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting movement from ponychallenge: {httpRequestException}");
                }
            }
        }

        private class MovementsData {
            public string direction;
        }

        public class StartData {
            public int difficulty;
            public int maze_height;
            public int maze_width;
            public string maze_player_name;
        }
    }
}
