import linecache
import linecache_data


filename = linecache_data.make_tempfile()

# Blank lines include the newline
print('BLANK : {!r}'.format(linecache.getline(filename, 8)))

linecache_data.cleanup(filename)
