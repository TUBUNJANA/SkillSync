# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: match.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0bmatch.proto\x12\x05match\"+\n\x0cMatchRequest\x12\x0e\n\x06resume\x18\x01 \x01(\t\x12\x0b\n\x03job\x18\x02 \x01(\t\"[\n\rMatchResponse\x12\x12\n\nsimilarity\x18\x01 \x01(\x02\x12\x16\n\x0emissing_skills\x18\x02 \x01(\t\x12\x1e\n\x16\x63ourse_recommendations\x18\x03 \x01(\t2;\n\x05Match\x12\x32\n\x05Match\x12\x13.match.MatchRequest\x1a\x14.match.MatchResponseb\x06proto3')



_MATCHREQUEST = DESCRIPTOR.message_types_by_name['MatchRequest']
_MATCHRESPONSE = DESCRIPTOR.message_types_by_name['MatchResponse']
MatchRequest = _reflection.GeneratedProtocolMessageType('MatchRequest', (_message.Message,), {
  'DESCRIPTOR' : _MATCHREQUEST,
  '__module__' : 'match_pb2'
  # @@protoc_insertion_point(class_scope:match.MatchRequest)
  })
_sym_db.RegisterMessage(MatchRequest)

MatchResponse = _reflection.GeneratedProtocolMessageType('MatchResponse', (_message.Message,), {
  'DESCRIPTOR' : _MATCHRESPONSE,
  '__module__' : 'match_pb2'
  # @@protoc_insertion_point(class_scope:match.MatchResponse)
  })
_sym_db.RegisterMessage(MatchResponse)

_MATCH = DESCRIPTOR.services_by_name['Match']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _MATCHREQUEST._serialized_start=22
  _MATCHREQUEST._serialized_end=65
  _MATCHRESPONSE._serialized_start=67
  _MATCHRESPONSE._serialized_end=158
  _MATCH._serialized_start=160
  _MATCH._serialized_end=219
# @@protoc_insertion_point(module_scope)
