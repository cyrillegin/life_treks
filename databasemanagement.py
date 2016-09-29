import os
import cherrypy
import json
import random
import string


class dbmanager(object):

    @property
    def db(self):
        return cherrypy.request.db

    @cherrypy.expose
    def enter_name(self, **kwargs):
        self.db.add(Entry(firstName=kwargs['first_name'], lastName=kwargs['last_name'], age=kwargs['age']))
        self.db.commit()

    @cherrypy.expose
    def get_table(self, **kwargs):
        print "\n\n{}\n".format(kwargs)
        data = []
        return json.dumps(data, indent=4)

    @cherrypy.expose
    def delete_entries(self, **kwargs):
        for i in self.db.query(Entry).all():
            self.db.delete(i)
        self.db.commit()

    @cherrypy.expose
    def getUserName():
