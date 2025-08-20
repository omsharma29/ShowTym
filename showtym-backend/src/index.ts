import { Hono } from 'hono'
import 'dotenv/config' // remove it while deploying in cloudflare as because not supoorted 
import { serve } from '@hono/node-server'
import { TopUSAmovies } from './routerFunction/TopUSmovies.js'
import { TopIndianMovies } from './routerFunction/TopIndianMovies.js'
import { upcomingIndianMovies } from './routerFunction/IndianMoviesUpcoming.js'
import { AutoComplete } from './routerFunction/AutoComplete.js'
import { CastInfo } from './routerFunction/CastInfo.js'
import { rateLimiter } from './lib/ratelimit.js'
// while deploying in cloudflare 
// write all credential in wranger.toml and use c.env.url but for node local use process.env.url

const app = new Hono()

app.use('*', rateLimiter)

app.get('/', (c) => c.text('🎬 Showtyme Backend is Live!'))

app.get('/api/usmovies', TopUSAmovies)
app.get('/api/indianmovies', TopIndianMovies)
app.get('/api/upcoming', upcomingIndianMovies)
app.get('/api/search', AutoComplete)
app.get('/api/cast', CastInfo)


serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('✅ Server is running on http://localhost:3000')
