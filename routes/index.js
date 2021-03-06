var Entities = require("entities");
var FS = require('fs');
var XML2JS = require('xml2js');

var urlParser = require('url');
var HTTP = require('http');
var HTTPS = require('https');

var Parser = module.exports = {};

var TOP_FIELDS = ['title', 'description', 'author', 'link', 'image'];
var ITEM_FIELDS = [
  'title',
  'link',
  'pubDate',
  'author',
  'enclosure'
]

var stripHtml = function(str) {
  return str.replace(/<(?:.|\n)*?>/gm, '');
}

var getSnippet = function(str) {
  return Entities.decode(stripHtml(str)).trim();
}

var getContent = function(content) {
  if (typeof content._ === 'string') {
    return content._;
  } else if (typeof content === 'object') {
    var builder = new XML2JS.Builder({headless: true, explicitRoot: true, rootName: 'div', renderOpts: {pretty: false}});
    return builder.buildObject(content);
  } else {
    return content;
  }
}

var parseAtomFeed = function(xmlObj, callback) {
  var feed = xmlObj.feed;
  var json = {feed: {entries: []}};
  if (feed.link) {
    if (feed.link[0] && feed.link[0].$.href) json.feed.link = feed.link[0].$.href;
    if (feed.link[1] && feed.link[1].$.href) json.feed.feedUrl = feed.link[1].$.href;
  }
//Begin Custom Code
  if(feed.image) {
    json.feed.image = {
      height: feed.height[0],
      link: feed.link[0],
      title: feed.title[0],
      url: feed.url[0],
      width: feed.width[0]
    }
  }
    
//End Custom Code
  if (feed.title) {
    var title = feed.title[0] || '';
    if (title._) title = title._
    if (title) json.feed.title = title;
  }
  var entries = feed.entry;
  (entries || []).forEach(function (entry) {
    var item = {};
    if (entry.title) {
      var title = entry.title[0] || '';
      if (title._) title = title._;
      if (title) item.title = title;
    }
//Begin Custom Code
    console.log(entry);  
    console.log('Before if for enclosure');
    if (entry.enclosure) {
        console.log('enclosure present Meow');
        item.enclosure = {
            length: entry.enclosure.$.length,
            type: entry.enclosure.$.type,
            url: entry.enclosure.$.url
        }
    }
//End Custom Code
    if (entry.link && entry.link.length) item.link = entry.link[0].$.href;
    if (entry.updated && entry.updated.length) item.pubDate = new Date(entry.updated[0]).toISOString();
    if (entry.author && entry.author.length) item.author = entry.author[0].name[0];
    if (entry.content && entry.content.length) {
      item.content = getContent(entry.content[0]);
      item.contentSnippet = getSnippet(item.content)
    }
    if (entry.id) {
      item.id = entry.id[0];
    }
    json.feed.entries.push(item);
  });
  callback(null, json);
}

var parseRSS1 = function(xmlObj, callback) {
  callback("RSS 1.0 parsing not yet implemented.")
}
var parseRSS2 = function(xmlObj, callback) {
  var json = {feed: {entries: []}};
  var channel = xmlObj.rss.channel[0];
  if (channel['atom:link']) json.feed.feedUrl = channel['atom:link'][0].href;
  TOP_FIELDS.forEach(function(f) {
    if (channel[f]) json.feed[f] = channel[f][0];
  })
  var items = channel.item;
  (items || []).forEach(function(item) {
    var entry = {};
    ITEM_FIELDS.forEach(function(f) {
      if (item[f]) entry[f] = item[f][0];
    })
//Begin Custom Code
    if(item.enclosure) {
        entry.enclosure = {
            length: item.enclosure[0].$.length,
            type: item.enclosure[0].$.type,
            url: item.enclosure[0].$.url
        };
    }
//End Custom Code
    
    if (item.description) {
      entry.content = getContent(item.description[0]);
      entry.contentSnippet = getSnippet(entry.content);
    }
    if (item.guid) {
      entry.guid = item.guid[0]._;
    }
    if (item.category) entry.categories = item.category;
    json.feed.entries.push(entry);
  })
  callback(null, json);
}

Parser.parseString = function(xml, callback) {
  XML2JS.parseString(xmlvar Entities = require("entities");
var FS = require('fs');
var XML2JS = require('xml2js');

var urlParser = require('url');
var HTTP = require('http');
var HTTPS = require('https');

var Parser = module.exports = {};

var TOP_FIELDS = ['title', 'description', 'author', 'link', 'image'];
var ITEM_FIELDS = [
  'title',
  'link',
  'pubDate',
  'author',
  'enclosure'
]

var stripHtml = function(str) {
  return str.replace(/<(?:.|\n)*?>/gm, '');
}

var getSnippet = function(str) {
  return Entities.decode(stripHtml(str)).trim();
}

var getContent = function(content) {
  if (typeof content._ === 'string') {
    return content._;
  } else if (typeof content === 'object') {
    var builder = new XML2JS.Builder({headless: true, explicitRoot: true, rootName: 'div', renderOpts: {pretty: false}});
    return builder.buildObject(content);
  } else {
    return content;
  }
}
//Custom code replacing xmlObj with podcast (podcast will contain the xmlObj necessary) so the db info can be used in the callback
var parseAtomFeed = function(podcast, callback) {
  var xmlObj = podcast.xmlObj;
  var feed = xmlObj.feed;
  var json = {feed: {entries: []}};
  if (feed.link) {
    if (feed.link[0] && feed.link[0].$.href) json.feed.link = feed.link[0].$.href;
    if (feed.link[1] && feed.link[1].$.href) json.feed.feedUrl = feed.link[1].$.href;
  }
//Begin Custom Code
  if(feed.image) {
    json.feed.image = {
      height: feed.height[0],
      link: feed.link[0],
      title: feed.title[0],
      url: feed.url[0],
      width: feed.width[0]
    }
  }
    
//End Custom Code
  if (feed.title) {
    var title = feed.title[0] || '';
    if (title._) title = title._
    if (title) json.feed.title = title;
  }
  var entries = feed.entry;
  (entries || []).forEach(function (entry) {
    var item = {};
    if (entry.title) {
      var title = entry.title[0] || '';
      if (title._) title = title._;
      if (title) item.title = title;
    }
//Begin Custom Code
    console.log(entry);  
    console.log('Before if for enclosure');
    if (entry.enclosure) {
        console.log('enclosure present Meow');
        item.enclosure = {
            length: entry.enclosure.$.length,
            type: entry.enclosure.$.type,
            url: entry.enclosure.$.url
        }
    }
//End Custom Code
    if (entry.link && entry.link.length) item.link = entry.link[0].$.href;
    if (entry.updated && entry.updated.length) item.pubDate = new Date(entry.updated[0]).toISOString();
    if (entry.author && entry.author.length) item.author = entry.author[0].name[0];
    if (entry.content && entry.content.length) {
      item.content = getContent(entry.content[0]);
      item.contentSnippet = getSnippet(item.content)
    }
    if (entry.id) {
      item.id = entry.id[0];
    }
    json.feed.entries.push(item);
  });
  //attaching the json object to podcast for use in front end 
  var podcastCopy = {
      description: podcast.description,
      feed: json.feed,
      rssUrl: podcast.rssUrl,
      title: podcast.title,
      _id: podcast._id
  }
  callback(null, podcastCopy);
}

var parseRSS1 = function(xmlObj, callback) {
  callback("RSS 1.0 parsing not yet implemented.")
}
//Custom Code replacing xmlObj with podcast so I have access to it in callback
var parseRSS2 = function(podcast, callback) {
  var xmlObj = podcast.xmlObj;
  var json = {feed: {entries: []}};
  var channel = xmlObj.rss.channel[0];
  if (channel['atom:link']) json.feed.feedUrl = channel['atom:link'][0].href;
  TOP_FIELDS.forEach(function(f) {
    if (channel[f]) json.feed[f] = channel[f][0];
  })
  var items = channel.item;
  (items || []).forEach(function(item) {
    var entry = {};
    ITEM_FIELDS.forEach(function(f) {
      if (item[f]) entry[f] = item[f][0];
    })
//Begin Custom Code
    if(item.enclosure) {
        entry.enclosure = {
            length: item.enclosure[0].$.length,
            type: item.enclosure[0].$.type,
            url: item.enclosure[0].$.url
        };
    }
//End Custom Code
    
    if (item.description) {
      entry.content = getContent(item.description[0]);
      entry.contentSnippet = getSnippet(entry.content);
    }
    if (item.guid) {
      entry.guid = item.guid[0]._;
    }
    if (item.category) entry.categories = item.category;
    json.feed.entries.push(entry);
  })
  //attaching the json object to podcast for use in front end
  var podcastCopy = {
      description: podcast.description,
      feed: json.feed,
      rssUrl: podcast.rssUrl,
      title: podcast.title,
      _id: podcast._id
  }
  callback(null, podcastCopy);
}

//Custom code replacing xml with podcast so i can use podcast in the callback
Parser.parseString = function(podcast, callback) {
  XML2JS.parseString(podcast.feed, function(err, result) {
    if (err) throw err;
    podcast.xmlObj = result;
    if (result.feed) {
      return parseAtomFeed(podcast, callback)
    } else if (result.rss && result.rss.$.version && result.rss.$.version.indexOf('2') === 0) {
      return parseRSS2(podcast, callback);
    } else {
      return parseRSS1(podcast, callback);
    }
  });
}
//Custom Edit: making this function take a podcast object instead of just the url, this allows me to have access to podcast ids in callback (Also changing xml to be podcast.feed
Parser.parseURL = function(podcast, callback) {
  var url = podcast.rssUrl;
  podcast.feed = '';
  var get = url.indexOf('https') === 0 ? HTTPS.request : HTTP.request;//HTTPS.get : HTTP.get;
    var options = urlParser.parse(url);
    options.headers = {
        'User-Agent': 'CastEverywhereCashMoneyServer'   
    }
    options.method = 'GET';
  var req = get( options, function(res) {
    if (res.statusCode >= 300) return callback(new Error("Status code " + res.statusCode))
    res.setEncoding('utf8');
    
    res.on('data', function(chunk) {
      podcast.feed += chunk;
    });
    res.on('end', function() {
      return Parser.parseString(podcast, callback);
    })
  })
//  console.log(req);
    req.on('error', callback);
    req.end();
}

Parser.parseFile = function(file, callback) {
  FS.readFile(file, 'utf8', function(err, contents) {
    return Parser.parseString(contents, callback);
  })
}
, function(err, result) {
    if (err) throw err;
    if (result.feed) {
      return parseAtomFeed(result, callback)
    } else if (result.rss && result.rss.$.version && result.rss.$.version.indexOf('2') === 0) {
      return parseRSS2(result, callback);
    } else {
      return parseRSS1(result, callback);
    }
  });
}

Parser.parseURL = function(url, callback) {
  var xml = '';
  var get = url.indexOf('https') === 0 ? HTTPS.request : HTTP.request;//HTTPS.get : HTTP.get;
    var options = urlParser.parse(url);
    options.headers = {
        'User-Agent': 'CastEverywhereCashMoneyServer'   
    }
    options.method = 'GET';
  var req = get( options, function(res) {
    if (res.statusCode >= 300) return callback(new Error("Status code " + res.statusCode))
    res.setEncoding('utf8');
    
    res.on('data', function(chunk) {
      xml += chunk;
    });
    res.on('end', function() {
      return Parser.parseString(xml, callback);
    })
  })
//  console.log(req);
    req.on('error', callback);
    req.end();
}

Parser.parseFile = function(file, callback) {
  FS.readFile(file, 'utf8', function(err, contents) {
    return Parser.parseString(contents, callback);
  })
}
