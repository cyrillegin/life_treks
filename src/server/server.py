#!/usr/bin/env python
import cherrypy
import os
import sys
import logging
from cherrypy.lib.static import serve_file
import json

PATH = os.path.abspath(os.path.dirname(__file__))
STATIC = os.path.join(PATH, '../../dist')
sys.path.append(PATH)

# NOTE: Do not update this manually, use `npm run incMajor` or `npm  run incMinor`
VERSION = '0.1.0'
BUILD_DATE = 1534782958.84


def get_cp_config():
    config = {
        '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': STATIC,
            'tools.staticdir.index': 'index.html',
            'tools.sessions.on': True
        },
    }
    return config


class Root(object):

    @cherrypy.expose
    def default(self, *args, **kwargs):
        return serve_file(os.path.join(STATIC, 'index.html'))
    # 
    # @cherrypy.expose
    # def boats(self, *args, **kwargs):
    #     try:
    #         data = json.loads(cherrypy.request.body.read().decode('utf-8'))
    #     except ValueError:
    #         logging.error('Json data could not be read.')
    #         return json.dumps({"error": "Data could not be read."}).encode('utf-8')
    # 
    #     if data['model'] == 'default':
    #         print 'get default'
    #     return json.dumps('success')


def RunServer():
    cherrypy.tree.mount(Root(), '/', config=get_cp_config())
    cherrypy.server.socket_host = "0.0.0.0"
    cherrypy.server.socket_port = int(os.environ.get('PORT', 3000))
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    logging.info("starting server!")
    RunServer()
