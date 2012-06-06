require 'rho/rhoapplication'
require 'net/http'

class AppApplication < Rho::RhoApplication
  def initialize
    # Tab items are loaded left->right, @tabs[0] is leftmost tab in the tab-bar
    # Super must be called *after* settings @tabs!
    @tabs = nil
    #To remove default toolbar uncomment next line:
    @@toolbar = nil
    super

    # Uncomment to set sync notification callback to /app/Settings/sync_notify.
    # SyncEngine::set_objectnotify_url("/app/Settings/sync_notify")
    SyncEngine.set_notification(-1, "/app/Settings/sync_notify", '')
    
    # init HTTP 
    @@http = Net::HTTP.new('sinw069070', 23456)
    @@cookie = nil
  end
  
  def self.http
    @@http
  end
  
  def self.cookie
    @@cookie
  end
  
  def self.cookie=(value)
    @@cookie = value
  end
end
