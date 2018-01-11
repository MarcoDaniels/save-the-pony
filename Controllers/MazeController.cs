using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace save_the_pony.Controllers {
    
    [Route("api/[controller]")]
    public class MazeController : Controller {
        
        // creates a new maze game
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

        // gets maze status
        [HttpGet("[action]/{mazeId}")]
        public IActionResult Status(string mazeId) {
            var id = mazeId.Replace("_", "-");
            using (var client = new HttpClient()) {
                try {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var response = client.GetAsync($"{id}").Result;                    

                    var stringResult = response.Content.ReadAsStringAsync().Result.Replace("-","_");

                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting data from ponychallenge: {httpRequestException.Message}");
                }
            }
        }

        // moves pony in direction
        [HttpPost("[action]/{mazeId}/{direction}")]
        public IActionResult MovePony(string mazeId, string direction) {
            var id = mazeId.Replace("_", "-");
            var jsonPost = new MovementsData { direction = direction };
            using (var client = new HttpClient()) {
                try {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var movement = JsonConvert.SerializeObject(jsonPost);
                    
                    var response = client.PostAsync(
                        $"{id}",
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

        /**
         * Movement data for pony
         */
        private class MovementsData {
            public string direction;
        }

        /**
         * Starting data for challange
         */
        public class StartData {
            public int difficulty;
            public int maze_height;
            public int maze_width;
            public string maze_player_name;
        }
    }
}
