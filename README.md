[![Build Status](https://semaphoreci.com/api/v1/projects/58f74bc7-9070-4e73-8629-faf6833f94ab/566632/badge.svg)](https://semaphoreci.com/dittach/loopback-connector-riak)

## loopback-connector-riak

Riak connector for loopback-datasource-juggler.  This adapter is based on the [official Basho Riak client library](https://github.com/basho/riak-nodejs-client).

This adapter makes heavy use of Yokozuna, the Solr-backed search features of Riak 2.  It probably won't work with Riak 1.x at all.

## Customizing Riak configuration

The Riak connector can be configured much like any other Loopback connector using the datasources JSON files.

### Example datasources file

```javascript
{
  "db": {
    "name": "db",
    "connector": "riak",
    "host": [
      "riak1.local.foo.com:8087",
      "riak2.local.foo.com:8087",
      "riak3.local.foo.com:8087",
      "riak4.local.foo.com:8087",
      "riak5.local.foo.com:8087"
    ]
  }
}
```

### Riak-oriented model configuration

Your Loopback models can provide some Riak-specific configuration options.  Here's an example of specifying the Yokozuna index to use for the attribute, if the index name is different than the attribute name:

```javascript
...
  "last_name": {
    "type":     "string",
    "required": true,
    "riak": {
      "yzField": "lname"
    }
  }
...
```

## Running tests

npm run test

## Things that aren't implemented yet

* bucket types
* 'include' filter support is experimental
* relational features such as hasMany, belongsTo, hasManyAndBelongsTo, are not supported as Riak is not a relational database (there is a chance they will work, but they are not tested)

## Warnings

* Some things that are normal in other databases are expensive with Riak and this connector doesn't try to hide any of that, although it does try to take the shortest path (like looking up by key whenever possible.)

## Release notes

* 1.0.0 Currently in production over at Dittach. Tests are passing.
* 0.1.x Improvements to test coverage, feature support, Node v0.12+ support.
* 0.0.x Proof-of-concept releases

## Testing

Tests pulled in from the Loopback test suite.  These tests hit the database and they're written in a very SQL-oriented, ACID way that makes testing eventually consistent databases really difficult.  As a result we had to put a bunch of delays statements in the tests to accomodate for Riak's eventual consistency in things like populating indexes, etc.  This unfortunately makes the test suite very slow.

While we've done our best to reset the state each time the tests are run, the recommendation is to nuke your Riak data entirely before running these tests with a rm -rf.  That directory is usually /var/lib/riak on Linux.

```shell
$ mocha --timeout 60000
```
