import pymysql
pymysql.install_as_MySQLdb()

# Python 3.14 Robust Compatibility Patch for Django 4.2 Context Objects
from django.template.context import BaseContext, Context, RequestContext

def universal_context_copy(self):
    cls = self.__class__
    duplicate = cls.__new__(cls)
    duplicate.__dict__.update(self.__dict__)
    duplicate.dicts = self.dicts[:]
    if hasattr(self, 'render_context'):
        duplicate.render_context = self.render_context.__copy__()
    return duplicate

BaseContext.__copy__ = universal_context_copy
Context.__copy__ = universal_context_copy
RequestContext.__copy__ = universal_context_copy