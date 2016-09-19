import os
import cherrypy


PATH = os.path.abspath(os.path.join(os.path.dirname(__file__)))


class Root(object):
    print "\n\nHello from Server!\n"


def get_cp_config():
    return {
        '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': PATH,
            'tools.staticdir.index': 'index.html',
        },
    }


def runserver(config):
    cherrypy.tree.mount(Root(), '/', config)
    cherrypy.server.socket_host = "0.0.0.0"
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    runserver(get_cp_config())
else:
    cherrypy.config.update({'environment': 'embedded'})
    application = cherrypy.Application(
        Root(), script_name=None, config=get_cp_config())
