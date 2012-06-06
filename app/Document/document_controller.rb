require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'net/http'
require 'uri'
require 'rexml/document'

include REXML
class DocumentController < Rho::RhoController
  include BrowserHelper
  def json
    data = <<-EOF
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:soap1="http://schemas.microsoft.com/sharepoint/soap/">
           <soap:Header/>
           <soap:Body>
              <soap1:Login>
                 <soap1:username>doctester</soap1:username>
                 <soap1:password>Pwcwelcome1</soap1:password>
              </soap1:Login>
           </soap:Body>
        </soap:Envelope>
        EOF
    headers = {
      'Content-Type' => 'text/xml; charset=\"utf-8\"'
    }
    http = Net::HTTP.new('sinw069070', 23456)
    path = '/_vti_bin/Authentication.asmx'
    resp, data = http.post(path, data, headers)
    cookie = resp.response['set-cookie'].split('; ')[0]
    path = @params['node']
    #the node parameter is like '/Shared Documents', '/Shared Documents/Test/a', it should be escaped before added to the url.
    #sample path:'/_vti_bin/ListData.svc/SharedDocuments?%24filter=Path+eq+%27%2FShared+Documents%27'
    path = URI.escape(path)
    #contentType='Folder'
    contentTypeFilter="ContentType%20eq%20'Folder'"
    getListPath = "/_vti_bin/ListData.svc/SharedDocuments?%24filter=#{contentTypeFilter}%20and%20Path%20eq%20'#{path}'"
    request = Net::HTTP::Get.new(getListPath)
    request['Cookie'] = cookie
    request['Content-Type']='text/xml; charset=\"utf-8\"'
    request['Accept'] = 'application/json'
    response = http.request(request)
    json_resp = Rho::JSON.parse(response.body)
    @response['headers']['Content-Type']='application/json;charset=utf-8'
    render :string => response.body
  end

  def files
    data = <<-EOF
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:soap1="http://schemas.microsoft.com/sharepoint/soap/">
           <soap:Header/>
           <soap:Body>
              <soap1:Login>
                 <soap1:username>doctester</soap1:username>
                 <soap1:password>Pwcwelcome1</soap1:password>
              </soap1:Login>
           </soap:Body>
        </soap:Envelope>
        EOF
    headers = {
      'Content-Type' => 'text/xml; charset=\"utf-8\"'
    }
    http = Net::HTTP.new('sinw069070', 23456)
    path = '/_vti_bin/Authentication.asmx'
    resp, data = http.post(path, data, headers)
    cookie = resp.response['set-cookie'].split('; ')[0]
    path = @params['node']
    if path.nil? || path ===''
      path = '/Shared Documents' 
    end
    #the node parameter is like '/Shared Documents', '/Shared Documents/Test/a', it should be escaped before added to the url.
    #sample path:'/_vti_bin/ListData.svc/SharedDocuments?%24filter=Path+eq+%27%2FShared+Documents%27'
    path = URI.escape(path)
    contentTypeFilter="ContentType%20eq%20'Document'"
    getListPath = "/_vti_bin/ListData.svc/SharedDocuments?%24filter=#{contentTypeFilter}%20and%20Path%20eq%20'#{path}'"
    request = Net::HTTP::Get.new(getListPath)
    request['Cookie'] = cookie
    request['Content-Type']='text/xml; charset=\"utf-8\"'
    request['Accept'] = 'application/json'
    response = http.request(request)
    json_resp = Rho::JSON.parse(response.body)
    @response['headers']['Content-Type']='application/json;charset=utf-8'
    render :string => response.body
  end
  
  # GET /Document
  def index
    @documents = Document.find(:all)
    render :back => '/app'
  end

  # GET /Document/{1}
  def show
    @document = Document.find(@params['id'])
    if @document
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Document/new
  def new
    @document = Document.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Document/{1}/edit
  def edit
    @document = Document.find(@params['id'])
    if @document
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Document/create
  def create
    @document = Document.create(@params['document'])
    redirect :action => :index
  end

  # POST /Document/{1}/update
  def update
    @document = Document.find(@params['id'])
    @document.update_attributes(@params['document']) if @document
    redirect :action => :index
  end

  # POST /Document/{1}/delete
  def delete
    @document = Document.find(@params['id'])
    @document.destroy if @document
    redirect :action => :index
  end
end
