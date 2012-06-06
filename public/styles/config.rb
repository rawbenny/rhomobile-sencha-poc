# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework
load File.join(dir, '..', 'sdk', 'resources', 'themes')

# Look for any *.scss files in same directory as this file
# Place compiled *.css files in the parent directory
sass_path = dir
images_dir = File.join(dir, "..", "sdk",'resources','themes','images','default')
css_path = File.join(dir, "..",'resources','css')
output_style = :expanded
environment = :development