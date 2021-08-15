import IORedis from 'ioredis';

import LuaParams from '../internship-junior/LuaParams';

const luaParams = new LuaParams();


async function main() {

  const lua = `
  for i=1,#KEYS,1 do 
    redis.call('rpush', 'points', KEYS[i])
    redis.call('rpush', 'points', ARGV[i])
  end
 
  local data = redis.call('lrange', 'points')
  -- data[1] => x point 0
  -- data[2] => y point 0
  -- data[3] => x point 1
  -- data[4] => y point 1
  for i=1,#data,2 do
    -- x = data[i] 
    -- y = data[i+1] 
    -- calculate for avg or whatever
  end

  return true
`;

  const redis = new IORedis();

  const commandName = 'saddex';
  redis.defineCommand(commandName, { lua });
  const result = await (redis as any)[commandName](
    luaParams.argvCount(),
    ['8','2','11','6','5','4','12','9','6','1','3','10','3','6','8','12','1','4','9','14'],
    (err: any) => {
      if (err) console.log(`lua script error: ${commandName}`, err);
    },
  );
  console.log(result);
  console.log(luaParams.argvCount());
}

void main();

// Utility to handle graph information with complex methods for public use.
// Point (x,y)
// Line

// Graph X Y

// METHODS

// points 100 point

// query sort by x | y | time

// avgPoint

// maxX minX maxY minY

// bestFitLine => nil |  a, b     
