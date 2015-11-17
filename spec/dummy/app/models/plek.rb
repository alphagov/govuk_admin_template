# Dummy Plek so we don't have to add the gem to this dummy app.
class Plek
  def self.current
    new
  end

  def find(*)
    '/signon-url'
  end
end
