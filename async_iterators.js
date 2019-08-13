const fetch = require('node-fetch');
async function streamingRead() {
  // For demo purposes, hard-coding this link
  const response = await fetch('https://www.reddit.com/r/javascript/top/.json?limit=5');
  console.log(response.body);
  for await (const chunk of streamAsyncIterator(response.body)) {
    console.log(`Read ${chunk.length} bytes`);
  }
}

async function* streamAsyncIterator(stream) {
  // lock the stream
  const reader = stream.getReader();

  try {
    while (true) {
      // Read from the stream
      const {done, value} = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value;
    }
  }
  finally {
    reader.releaseLock();
  }
}

streamingRead();
