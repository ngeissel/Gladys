---
inject: true
to: "./services/<%= module %>/api/<%= module %>.controller.js"
before: "  return {"
skip_if: "async function discover(req, res) {"
---
  /**
   * @api {get} /api/v1/service/<%= module %>/discover Get <%= className %> devices
   * @apiName discover
   * @apiGroup <%= className %>
   */
  async function discover(req, res) {
    const response = nukiHandler.getDiscoveredDevices();
    res.json(response);
  };

  /**
   * @api {post} /api/v1/service/<%= module %>/discover Discover new <%= className %> devices
   * @apiName discover
   * @apiGroup <%= className %>
   */
  async function scan(req, res) {
    const response = <%= attributeName %>Handler.scan();
    res.json(response);
  }
  