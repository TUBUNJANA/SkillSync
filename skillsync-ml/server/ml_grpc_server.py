import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from concurrent import futures
import grpc
import time
import match_pb2_grpc
from controller.matchController import MatchController

class MatchService(match_pb2_grpc.MatchServicer):
    def __init__(self):
        self.controller = MatchController()

    def Match(self, request, context):
        return self.controller.handle_match(request)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    match_pb2_grpc.add_MatchServicer_to_server(MatchService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server running at port 50051...")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
