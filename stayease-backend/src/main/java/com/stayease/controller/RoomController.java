package com.stayease.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stayease.dto.RoomRequestDto;
import com.stayease.entity.Room;
import com.stayease.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/pg/{pgId}")
    public Room addRoom(@RequestBody Room room, @PathVariable Long pgId){
        return roomService.addRoom(pgId, room);
    }

    @GetMapping("/pg/{pgId}")
    public List<Room> getByPg(@PathVariable Long pgId){
        return roomService.getRoomsByPg(pgId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
    roomService.deleteRoom(id);
    return ResponseEntity.ok("Room deleted successfully");
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Room> updateRoom(@PathVariable Long id,
//                                           @RequestBody Room updatedRoom) {
//        return ResponseEntity.ok(roomService.updateRoom(id, updatedRoom));
//    }
    
    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(
            @PathVariable Long roomId,
            @RequestBody RoomRequestDto request
    ) {
        Room updatedRoom = roomService.updateRoom(roomId, request);
        return ResponseEntity.ok(updatedRoom);
    }
}
